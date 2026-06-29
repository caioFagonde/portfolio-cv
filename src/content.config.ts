import { defineCollection, z } from 'astro:content';

const status = z.enum(['concept', 'prototype', 'active', 'implemented', 'benchmarked', 'production', 'archived']);
const confidence = z.enum(['conceptual', 'documented', 'implemented', 'benchmarked', 'field-tested', 'production']);

const cases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    status,
    confidence,
    domains: z.array(z.string()),
    stack: z.array(z.string()),
    methods: z.array(z.string()).default([]),
    role: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(999),
    links: z.array(z.object({ label: z.string(), href: z.string(), kind: z.string() })).default([])
  })
});

const essays = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.date(),
    domains: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.date(),
    domains: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

export const collections = { cases, essays, notes };
