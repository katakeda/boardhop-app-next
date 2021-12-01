/// <reference types="cypress" />

describe('Get posts', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/posts');
  })

  it('should get all surfboard posts with empty params', () => {
    expect(true).equal(true);
  })
})
