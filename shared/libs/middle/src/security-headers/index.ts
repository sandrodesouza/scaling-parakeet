// https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html#security-headers

export const securityHeaders = (headers) => {
  // Prevent sensitive information from being cached.
  headers['Cache-Control'] = 'no-store'

  // To protect against drag-and-drop style clickjacking attacks.
  headers['Content-Security-Policy'] = "frame-ancestors 'none'"

  // To require connections over HTTPS and to protect against spoofed certificates
  headers['Strict-Transport-Security'] =
    'max-age=' + Math.round(180 * 24 * 60 * 60) + '; includeSubDomains; preload'

  // To prevent browsers from performing MIME sniffing, and inappropriately interpreting responses as HTML.
  headers['X-Content-Type-Options'] = 'nosniff'

  // To protect against drag-and-drop style clickjacking attacks.
  headers['X-Frame-Options'] = 'DENY'
}
