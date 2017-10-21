var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        toMine = RoomPosition(20, 43, "W57S75");
        
        if(creep.harvest(toMine) == ERR_NOT_IN_RANGE) {
                creep.moveTo(toMine, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
	}
};

module.exports = roleMiner;