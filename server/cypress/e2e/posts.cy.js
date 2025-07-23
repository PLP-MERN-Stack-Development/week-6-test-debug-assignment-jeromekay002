describe('Posts Flow', () => {
  it('Loads homepage and displays posts', () => {
    cy.visit('http://localhost:3000'); // update to your frontend URL
    cy.contains('Posts');
  });

  it('Can create a new post', () => {
    cy.get('input[name="title"]').type('Test Post');
    cy.get('textarea[name="content"]').type('This is a test post');
    cy.get('button[type="submit"]').click();
    cy.contains('Test Post');
  });
});
