Feature: Homepage navigation
  As a visitor
  I want to use the homepage controls
  So that I can navigate the application

  Scenario: Increment the counter and open the About page
    Given I open the homepage
    When I increment the counter
    And I navigate to the About page
    Then I should see the About page and a link back home

  Scenario: Open a product by its ID
    Given I open the homepage
    When I open product 2
    Then I should see product ID 2

  Scenario: Navigate through the nested product route
    Given I open the homepage
    When I open the nested product 1
    Then I should see product ID 1

  Scenario: Show a not-found page for an unknown route
    Given I open the homepage
    When I open an unknown route
    Then I should see the not-found page and a link back home
