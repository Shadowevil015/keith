const util = require("minecraft-server-util")

        const options = {
            enableSRV: true
        }
        
		util.status('play.ccnetmc.com', 25567, options).then((result) => console.log(result)).catch((error) => console.error(error));