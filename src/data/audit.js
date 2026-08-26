import { MASTER_EVENTS } from './eventsMaster.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This audit utility is intentionally kept as a non-executing stub to avoid
// noisy dev-only logging in the shipped app. The website uses the live data
// source directly and does not require this diagnostic script at runtime.
export const __auditStub = true;
