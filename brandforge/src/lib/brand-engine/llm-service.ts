import { BrandProject, RawBrandInput } from '@/types/brand';
import { generateBrandProject } from './generator';

export interface AIConfig {
  provider: 'local' | 'gemini' | 'openai';
  apiKey?: string;
  model?: string;
}

export async function processBrandPipeline(
  input: RawBrandInput,
  config: AIConfig = { provider: 'local' }
): Promise<{ project: BrandProject; source: 'local' | 'gemini' | 'openai'; executionTimeMs: number }> {
  const startTime = Date.now();

  // If local engine or no API key, use high-intelligence built-in generator
  if (config.provider === 'local' || !config.apiKey) {
    // Add artificial natural synthesis delay for UI realism (800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));
    const project = generateBrandProject(input);
    return {
      project,
      source: 'local',
      executionTimeMs: Date.now() - startTime
    };
  }

  // Attempt Gemini API if selected
  if (config.provider === 'gemini') {
    try {
      const model = config.model || 'gemini-1.5-flash';
      const prompt = `You are BrandForge AI, an elite brand strategist and multi-agent brand intelligence engine.
Given this startup/product idea:
Idea: "${input.idea}"
Target Market: "${input.targetMarket}"
Existing Problem: "${input.existingProblem}"
Location/Market: "${input.location}"
Business Goals: "${input.businessGoals}"
Constraints: "${input.constraints}"
Competitors: "${input.competitors}"

Generate a complete, high-fidelity brand strategy and system following the 6 stages:
1. Discover (Core problem, target users, pain points, jobs to be done, assumptions)
2. Position (Category, value prop, differentiator, competitive angle, positioning statement, persona)
3. Shape (Personality traits, traits to avoid, naming territories, selected brand name, taglines, voice)
4. Visualize (Logo concept, typography pairings, color palette with hex codes, ui mood)
5. Critic (Critique points catching generic names, clichés, conflicting personality, audience mismatch, weak value prop, visual clichés)
6. Deliver Launch Kit (Landing page headline/hero copy, social posts, twitter thread, PR announcement)

Return ONLY valid JSON matching the BrandProject schema.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.7
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API returned status ${response.status}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (content) {
        const parsed = JSON.parse(content);
        // Ensure critical fields exist or fallback gracefully
        const project = generateBrandProject(input);
        const merged: BrandProject = {
          ...project,
          ...parsed,
          id: project.id,
          rawInput: input
        };
        return {
          project: merged,
          source: 'gemini',
          executionTimeMs: Date.now() - startTime
        };
      }
    } catch (err) {
      console.warn('Gemini generation failed, falling back to local intelligent engine:', err);
    }
  }

  // Attempt OpenAI API if selected
  if (config.provider === 'openai') {
    try {
      const model = config.model || 'gpt-4o-mini';
      const prompt = `You are BrandForge AI. Create a complete structured JSON brand project for:
Idea: "${input.idea}"
Target: "${input.targetMarket}"
Problem: "${input.existingProblem}"`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          const project = generateBrandProject(input);
          return {
            project: { ...project, ...parsed, id: project.id, rawInput: input },
            source: 'openai',
            executionTimeMs: Date.now() - startTime
          };
        }
      }
    } catch (err) {
      console.warn('OpenAI generation failed, falling back to local intelligent engine:', err);
    }
  }

  // Graceful fallback
  const fallbackProject = generateBrandProject(input);
  return {
    project: fallbackProject,
    source: 'local',
    executionTimeMs: Date.now() - startTime
  };
}
