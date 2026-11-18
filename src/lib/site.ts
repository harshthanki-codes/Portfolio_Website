import { assetPath } from './paths';

/**
 * Single source of truth for portfolio constants and contact information.
 * As required by hard rules: EMAIL is centralized here.
 */
export const EMAIL = '[EMAIL: confirm which address]';

export const SITE = {
  name: 'Harsh Thanki',
  title: 'Harsh Thanki | AI engineer',
  role: 'AI engineer',
  location: 'Ahmedabad, India',
  description:
    'AI engineer in Ahmedabad building deterministic open-weights AI systems, local inference runtimes, and failover DAGs.',
  url: 'https://harshthanki-codes.github.io/Portfolio_Website',
  basePath: '/Portfolio_Website',
  github: 'https://github.com/harshthanki-codes',
  linkedin: 'https://linkedin.com/in/harsh-thanki',
  resumePdf: assetPath('/Harsh_Thanki_Resume.pdf'),
} as const;
