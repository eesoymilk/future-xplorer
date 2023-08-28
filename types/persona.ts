import { z } from 'zod';
import { Base, Issue, Workshop } from '@/types';

export const NewPersonaSchema = z.object({
  role: z.string().trim().nonempty(),
  name: z.string().trim().nonempty(),
  age: z.union([
    z.string().trim().nonempty(),
    z.number().int().positive().finite().safe(),
  ]),
  gender: z.enum(PersonaPresets.gender),
  trait: z.string().trim().nonempty(),
  other: z.string().trim(),
  image: z.string().url().nullable(),
});

export type NewPersona = z.infer<typeof NewPersonaSchema>;

export interface Persona extends Base, NewPersona {
  issue: Issue | string;
}

export interface PersonaContext {
  workshop: Pick<Workshop, '_id' | 'name' | 'description'>;
  issue: Pick<Issue, '_id' | 'title' | 'description'>;
}

export interface PortraitRequestBody extends PersonaContext {
  persona: NewPersona;
}