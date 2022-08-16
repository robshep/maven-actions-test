<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="uk.evosense.lib.mavenactionstest.lib.Library" %>
<%@ page import="uk.evosense.dev.mavenactionstest.app.Application" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Hello World Java JSP</title>
</head>
<body>
    <h1>Hello JSP and Servlet!</h1>
    <%
      Application app = new Application();
    %>
    <h2><%= app.getMsg() %>
    <h3><%= Library.getMsg() %>
</body>
</html>