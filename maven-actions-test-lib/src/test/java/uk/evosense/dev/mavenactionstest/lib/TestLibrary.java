package uk.evosense.dev.mavenactionstest.lib;

import org.junit.Assert;
import org.junit.Test;
import uk.evosense.lib.mavenactionstest.lib.Library;

public class TestLibrary {
	@Test
	public void testLibrary() {
		Assert.assertEquals("Hello Library World", Library.getMsg());
	}
}
