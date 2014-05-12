#CLI

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
		
			-u, --url [url]            url of the page to test
    		-p, --path [path]          path of the page to test
    		-b, --browser [browser]    ["chrome@>10.0.0","firefox@>6.0.0"]
    		-d, --verbose              needs verbose output or not
    		-r, --reporter [reporter]  which reporter to use, defaults to base reporter
    		-s, --screenshot           wants a screenshot or not

for example, run: 

	browserman test -u 'http://browserman.dp:9000/public/test.html' 
	
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
	
#Program API

Browserman also offers javascript api:

###List

	var browserman = new Browserman({
		host:'browserman.dp',
		port:'9000'
	});
		
	browserman.list().('done', function(workers) {
		// you get the workers
	}).on('error',function(err){
		// an error occured
	}).on('complete', function() {
		// completed
	});
	
###Test

	var browserman = new Browserman({
		host:'browserman.dp',
		port:'9000'
	});
		
	browserman.test({
		path:'path or html file',
		url:'page url',
		timeout:50000,
		requirement:{
			browser:[
				'chrome@>10.0.0',
				'firefox@>6.0.0'
			],
			screenshot:false
		}
	}).on('done', function(result) {
		// result by one browser
	}).on('error',function(err){
		// an error occured
	}).on('complete', function() {
		// completed
	})