const winston = require('winston')
const { createLogger, format, transports  }  = winston
const { combine, timestamp, label, prettyPrint, printf } = format;

module.exports = (filename, debug) => {

    const logger = createLogger({
        format: combine(
            timestamp(),
            format.json(),
        ),
	    transports: [
		    new transports.File({ filename }),
	    ]
	})


	if (debug && process.env.NODE_ENV !== 'production') {
	    logger.add(new transports.Console({
            format: combine(
                prettyPrint(10, true)
            )
	    }))
    }

	return logger
}
