/**
 * Domain/subdomain validation utilities
 * 
 * Enforces the rule: 5-50 characters, only letters, numbers, and hyphens.
 */

/**
 * Normalizes a domain string by converting spaces to hyphens
 */
export function normalizeDomain(domain: string): string {
  return domain.replace(/\s+/g, '-');
}

/**
 * Validates a domain/subdomain against the exact constraints
 * @returns An error message if invalid, or null if valid
 */
export function validateDomain(domain: string): string | null {
  // First normalize spaces to hyphens
  const normalized = normalizeDomain(domain);
  
  // Check length
  if (normalized.length < 5 || normalized.length > 50) {
    return 'Domain must be between 5 and 50 characters and contain only letters, numbers, and hyphens.';
  }
  
  // Check allowed characters (letters, numbers, hyphens only)
  const validPattern = /^[a-zA-Z0-9-]+$/;
  if (!validPattern.test(normalized)) {
    return 'Domain must be between 5 and 50 characters and contain only letters, numbers, and hyphens.';
  }
  
  return null;
}
