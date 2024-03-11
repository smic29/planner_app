require "application_system_test_case"

class HomesTest < ApplicationSystemTestCase
  test "visiting the landing page" do
    visit root_path

    assert_selector "h1", text: "Welcome to Planner"
    assert_selector "button", text: "Get Started"
  end

  test "checking on login and signup" do
    visit root_path

    click_on "Get Started"

    assert_selector "h3", text: "Login or sign up"
    assert_selector "a", text: "I'm already a user"
    assert_selector "a", text: "Sign me up!"
  end

  test "checking login and signup forms" do
    visit root_path

    click_on "Get Started"
    click_on "Sign me up!"

    assert has_selector?("form[method='POST']"), "Cannot signup"
    click_on "I'm already a user"

    assert has_selector?("form[method='POST']"), "Cannot login"
  end
end
