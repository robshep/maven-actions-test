package uk.evosense.dev.mavenactionstest.app;

import geb.Browser
import org.junit.Test
import org.junit.experimental.categories.Category
import org.openqa.selenium.htmlunit.HtmlUnitDriver


class WebAppIT {
	@Test
	void testWebAppBasic() {

		def browser = new Browser(driver: new HtmlUnitDriver())
		browser.setBaseUrl("http://localhost:9090/")
		browser.go "index.jsp"

		assert browser.$("h1").text() == "Hello JSP and Servlet!"
		assert browser.$("h2").text() == "Hello App World"
		assert browser.$("h3").text() == "Hello Library World"
	}
}
