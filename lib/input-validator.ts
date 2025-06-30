interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedText?: string;
}

interface ValidationConfig {
  maxLength: number;
  minLength: number;
  allowedChars: RegExp;
  blockedPatterns: RegExp[];
}

const DEFAULT_CONFIG: ValidationConfig = {
  maxLength: 1000, // Maximum characters allowed
  minLength: 1,
  allowedChars: /^[\w\s\.,!?;:'"()\-@#$%&+=\[\]{}|\\\/\n\r\t]*$/i,
  blockedPatterns: [
    // Potential prompt injection attempts
    /\b(ignore|disregard|forget|override)\s+(previous|prior|above|earlier)\s+(instruction|prompt|rule|direction)/i,
    /\b(system|admin|root|administrator)\s+(command|mode|access|privilege)/i,
    /\b(execute|run|eval|script|code|function)\s*\(/i,
    // Potential data exfiltration attempts
    /\b(api[_\s]?key|secret|token|password|credential)/i,
    // Excessive repetition (potential DoS)
    /(.)\1{50,}/,
    // Script injection attempts
    /<script|javascript:|data:text\/html|vbscript:/i,
  ]
};

export class InputValidator {
  private config: ValidationConfig;

  constructor(config: Partial<ValidationConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  validate(text: string): ValidationResult {
    if (!text || typeof text !== 'string') {
      return {
        isValid: false,
        error: 'Input must be a non-empty string',
      };
    }

    // Check length constraints
    if (text.length < this.config.minLength) {
      return {
        isValid: false,
        error: `Input must be at least ${this.config.minLength} character(s)`,
      };
    }

    if (text.length > this.config.maxLength) {
      return {
        isValid: false,
        error: `Input must not exceed ${this.config.maxLength} characters`,
      };
    }

    // Check for allowed characters
    if (!this.config.allowedChars.test(text)) {
      return {
        isValid: false,
        error: 'Input contains invalid characters',
      };
    }

    // Check for blocked patterns
    for (const pattern of this.config.blockedPatterns) {
      if (pattern.test(text)) {
        return {
          isValid: false,
          error: 'Input contains prohibited content',
        };
      }
    }

    // Sanitize the text
    const sanitizedText = this.sanitize(text);

    return {
      isValid: true,
      sanitizedText,
    };
  }

  private sanitize(text: string): string {
    return text
      .trim()
      // Remove excessive whitespace
      .replace(/\s+/g, ' ')
      // Remove null bytes and other control characters
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
      // Normalize quotes
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'");
  }
}

// Export a default validator instance
export const defaultValidator = new InputValidator();

// Export a stricter validator for sensitive operations
export const strictValidator = new InputValidator({
  maxLength: 500,
  blockedPatterns: [
    ...DEFAULT_CONFIG.blockedPatterns,
    // Additional strict patterns
    /\b(hack|exploit|vulnerability|bypass|circumvent)/i,
    /\b(sql|union|select|drop|delete|insert|update)\s/i,
    /[<>{}]/g, // Block angle brackets and braces entirely
  ]
});