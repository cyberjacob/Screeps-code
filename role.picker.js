var rolePicker = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy > 0) {
	        var targets = creep.room.find(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.moveTo(creep.room.getPositionAt(13, 33));
            }
        } else {
            const target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            if(target == null) {
                var position = creep.room.getPositionAt(13, 33);
                while(position.lookFor(LOOK_CREEPS) != "") {
                    if(creep.pos.isEqualTo(position)) {
                        return;
                    }
                    position.x += 1;
                }
                creep.moveTo(position);
            }
        }
	}
};

module.exports = rolePicker;