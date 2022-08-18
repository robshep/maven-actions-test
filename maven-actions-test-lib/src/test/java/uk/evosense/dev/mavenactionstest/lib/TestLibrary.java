package uk.evosense.dev.mavenactionstest.lib;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import uk.evosense.lib.mavenactionstest.lib.Library;

public class TestLibrary {
	@Test
	public void testLibrary() {
		Assertions.assertEquals("Hello Library World", Library.getMsg());
	}
}
