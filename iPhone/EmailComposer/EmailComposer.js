// window.plugins.emailComposer

function EmailComposer()
{
	this.resultCallback = null; // Function
}

EmailComposer.ComposeResultType =
{
	Cancelled:0,
	Saved:1,
	Sent:2,
	Failed:3,
	NotSent:4
}



// showEmailComposer : all args optional

EmailComposer.prototype.showEmailComposer = function(subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML)
{
	var args = {};
	if(toRecipients)
		args.toRecipients = toRecipients;
	if(ccRecipients)
		args.ccRecipients = ccRecipients;
	if(bccRecipients)
		args.bccRecipients = bccRecipients;
	if(subject)
		args.subject = subject;
	if(body)
		args.body = body;
	if(bIsHTML)
		args.bIsHTML = bIsHTML;

	PhoneGap.exec("com.phonegap.emailComposer.showEmailComposer",args);
}

// this will be forever known as the orch-func -jm
EmailComposer.prototype.showEmailComposerWithCB = function(cbFunction,subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML)
{
  this.resultCallback = cbFunction;
  this.showEmailComposer.apply(this,[subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML]);
}

EmailComposer.prototype._didFinishWithResult = function(res)
{
	this.resultCallback(res);
}



PhoneGap.addConstructor(function() 
{
	if(!window.plugins)
	{
		window.plugins = {};
	}
	window.plugins.emailComposer = new EmailComposer();
});