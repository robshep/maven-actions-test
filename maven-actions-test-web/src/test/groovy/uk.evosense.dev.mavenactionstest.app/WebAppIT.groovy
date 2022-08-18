package uk.evosense.dev.mavenactionstest.app


import com.github.mjeanroy.junit.servers.client.HttpClient
import com.github.mjeanroy.junit.servers.jupiter.JunitServerExtension
import com.github.mjeanroy.junit.servers.tomcat.EmbeddedTomcat
import geb.Browser
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.openqa.selenium.htmlunit.HtmlUnitDriver
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@ExtendWith(JunitServerExtension.class)
class WebAppIT {

	private static Logger log = LoggerFactory.getLogger(WebAppIT.class);

	@Test
	void testTomcatVersion(HttpClient client) {
		assert org.apache.tomcat.InstanceManager.class.getPackage().getImplementationVersion().startsWith("9.")

		def resp = client.prepareGet("/index.jsp").execute()
		assert resp.status() == 200
	}

	@Test
	void testTomcatMetadata(EmbeddedTomcat tomcat) {

		log.info("Tomcat is at: {}", tomcat.getUrl())

		def browser = new Browser(driver: new HtmlUnitDriver())
		browser.setBaseUrl(tomcat.getUrl())

		browser.go("/this-page-does-not-exist")
		assert browser.title.startsWith("HTTP Status 404 – Not Found")
		assert browser.$("h3").verifyNotEmpty().text().startsWith("Apache Tomcat/9.")
	}

	@Test
	void testWebAppBasic(EmbeddedTomcat tomcat) {

		log.info("Tomcat is at: {}", tomcat.getUrl())

		def browser = new Browser(driver: new HtmlUnitDriver())
		browser.setBaseUrl(tomcat.getUrl())

		browser.go("/index.jsp" )

		assert browser.$("h1").verifyNotEmpty().text() == "Hello JSP and Servlet!"
		assert browser.$("h2").verifyNotEmpty().text() == "Hello App World"
		assert browser.$("h3").verifyNotEmpty().text() == "Hello Library World"
	}
}
