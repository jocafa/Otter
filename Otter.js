(function (glob) {
	var Otter = {
		guid: function () {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = ~~(Math.random() * 16);
				return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			});
		}
	};

	function Document (options) {
		io.EventEmitter.call(this);
		options = options || {};

		this.endpoint = options.endpoint || 'http://localhost/document';

		this.guid = options.guid || Otter.guid();
		this.revision = options.revision || 0;
		this.properties = options.properties || {};

		this.pendingOperations = [];
		this.sentOperations = [];

		this.bindHandlers();

		this.connect();
	}

	Document.prototype = new io.EventEmitter;
	Document.prototype.constructor = Document;


	Document.prototype.bindHandlers = function bindHandlers () {
		for (var k in this) if (k.indexOf('handle') == 0) {
			this[k] = this[k].bind(this);
		}
	};

	Document.prototype.connect = function connect () {
		this.connection = io.connect(this.endpoint + '/' + this.guid);
		this.connection.on('connect', this.handleConnect);
		this.connection.on('ready', this.handleReady);
		this.connection.on('disconnect', this.handleDisconnect);
		this.connection.on('error', this.handleError);
	};

	Document.prototype.handleConnect = function handleConnect () {
		console.log('handleConnect', this);
	};

	Document.prototype.handleReady = function handleReady () {
		console.log('handleReady', this);
	};

	Document.prototype.handleDisconnect = function handleDisconnect () {
		console.log('handleDisconnect', this);
	};

	Document.prototype.handleError = function handleError () {
		console.log('handleError', this);
	};

	Document.prototype.addProperty = function addProperty (key, value) {
	};

	Document.prototype.setProperty = function setProperty (key, value) {
	};

	Document.prototype.insertChars = function insertChars (key, index, chars) {
	};

	Document.prototype.deleteChars = function deleteChars (key, index, length) {
	};

	Otter.Document = Document;
	glob.Otter = Otter;

})(typeof exports == 'undefined' ? this : exports);
