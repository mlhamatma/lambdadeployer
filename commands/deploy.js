'use strict'
var path = require('path')
var fs = require('fs')
var AWS = require('aws-sdk')
function getDefaultLamdaName(filename) {
	filename = path.dirname(filename)

	var default_lambda_name = filename.substr(filename.lastIndexOf('/')+1) // Don't want the trailing slash'
	// console.log("Here is the default name: " + default_lambda_name)

	return default_lambda_name
}

module.exports = function helloCommand(program) {

	program
		.command('deploy [aws_lambda_name]')
		.description('Deploy the given directory or the if no dir given the current dir.')
		.option("-e, --aws_lambda_env <aws_env>", "The enviroment that you want to deploy this code to in lambda.")
		.option("-d, --dir_to_deploy", "This is the name of the directory to deploy.")
		.action(function (aws_lambda_nm, command) {
			program.successMessage("Doing the deploy.")
			var aws_lambda_name = aws_lambda_nm || getDefaultLamdaName(__filename)
			var env_nm = command.aws_lambda_env || "dev"
			var dir_over_ride = command.dir_to_deploy || aws_lambda_name
			var S3 = new AWS.S3()

			
			/*console.log('Lambda name to use: ' + aws_lambda_name)
			console.log('Dir to use: ' + dir_over_ride)
			console.log('Env_nm to use: ' + env_nm)*/
			program.successMessage("Deploying: " + aws_lambda_name + " in " + env_nm)
			program.log(aws_lambda_name);

		});

};