var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
	        const target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
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

module.exports = roleHarvester;