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

  Scenario: SSR page is rendered on the server on a direct load
    When I load the "ssr" page directly
    Then the page was rendered on the "servidor"
    And the API time is shown

  Scenario: SSR page is rendered in the browser on client navigation
    Given I open the homepage
    When I open the SSR example
    Then the page was rendered on the "navegador"

  Scenario: SSG page is static and keeps its build date after hydration
    When I load the "ssg" page directly
    Then the page was rendered on the "servidor"
    And the rendered date is kept after hydration

  Scenario: Hydration page becomes hydrated and replays interactions
    When I load the "hydration" page directly
    Then the hydration page reports "sí"
    And the deferred block hydrates on interaction
