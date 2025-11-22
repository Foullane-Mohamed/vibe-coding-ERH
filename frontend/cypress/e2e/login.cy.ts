describe('Login Flow', () => {
  it('should allow a user to login', () => {
    cy.visit('/login');

    cy.get('input[name="email"]').type('doctor@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Assuming successful login redirects to dashboard
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });

  it('should show error on invalid credentials', () => {
    cy.visit('/login');

    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid credentials').should('be.visible');
  });
});
