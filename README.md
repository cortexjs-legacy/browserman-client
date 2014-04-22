###Usage:

	Usage: browserman [options] [command]

	Commands:

		config [options]       config server port and address
		list                   list all available browsers
		test [options]         test a page in all browsers that meets the requirement
		
###List available browsers:

run:	
	
	browserman list
	
and you would find the browsers that are ready to work:

	-------------------------------------------
	3 workers found
	-------------------------------------------
	Firefox(28.0.0)
	Safari(6.0.0)
	Chrome(34.0.0)
	
###Run a test:

usage:

	Usage: test [options]
		
		Options:
		
			-d, --destination [destination]  the destination page url to test
			-b, --browser [browser]          browser name
			-v, --version [version]          browser version, for example: >2.0
			-V, --verbose [version]          verbose or not

for example, run: 

	browserman test --destination='http://localhost:9000/public/test.html' 
	
you will see:
	
	✓ passes: 3 failures: 0 on Safari(6.0)
	✓ passes: 3 failures: 0 on Chrome(34.0)
	✓ passes: 3 failures: 0 on Firefox(28.0)
	
and you can use --verbose to see the detail:

	-----------------------------------------------------------
	✓ passes: 3 failures: 0 on Safari(6.0)
	-----------------------------------------------------------
	✓ Foobar #convertText() should convert text
	✓ Foobar #runMethod() should run a method
	✓ Foobar #sayHello() should return some text

	-----------------------------------------------------------
	✓ passes: 3 failures: 0 on Chrome(34.0)
	-----------------------------------------------------------
	✓ Foobar #convertText() should convert text
	✓ Foobar #runMethod() should run a method
	✓ Foobar #sayHello() should return some text

	-----------------------------------------------------------
	✓ passes: 3 failures: 0 on Firefox(28.0)
	-----------------------------------------------------------
	✓ Foobar #convertText() should convert text
	✓ Foobar #runMethod() should run a method
	✓ Foobar #sayHello() should return some text
