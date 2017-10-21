var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                // Find somewhere to build a thing
                var buildRoadsBetween = creep.room.find(FIND_STRUCTURES, {filter: (i) => 
                    i.structureType == STRUCTURE_SPAWN || 
                    i.structureType == STRUCTURE_EXTENSION || 
                    i.structureType == STRUCTURE_STORAGE || 
                    i.structureType == STRUCTURE_TOWER || 
                    i.structureType == STRUCTURE_EXTRACTOR || 
                    i.structureType == STRUCTURE_LAB || 
                    i.structureType == STRUCTURE_TERMINAL || 
                    i.structureType == STRUCTURE_CONTAINER || 
                    i.structureType == STRUCTURE_NUKER || 
                    i.structureType == STRUCTURE_CONTROLLER || 
                    i.structureType == STRUCTURE_LINK
                }) + creep.room.find(FIND_SOURCES)
                
                for(var source in buildRoadsBetween) {
                    for(var destination in buildRoadsBetween) {
                        if(source == destination) {
                            continue;
                        }
                        var path = PathFinder.search(source.pos, { pos: destination.pos, range: 1 });
                        for(var piece in path.path) {
                            if(piece.lookFor(LOOK_ROAD) != "") {
                                piece.createConstructionSite(STRUCTURE_ROAD);
                                return;
                            }
                        }
                        
                    }
                }
                
                // Spawner upgrades
                var spawnPos = Game.spawns['Spawn1'].pos
                if(Game.spawns['Spawn1'].memory.upgrades == null) {
                    Game.spawns['Spawn1'].memory.upgrades = {
                        "-1": {
                            "-1": false,
                            "0": true,
                            "1": false
                        },
                        "0": {
                            "-1": false,
                            "0": true,
                            "1": false
                        },
                        "1": {
                            "-1": false,
                            "0": false,
                            "1": false
                        },
                    }
                }
                
                for (var xdiff = -1; xdiff < 2; xdiff += 2) {
                    for (var ydiff = -1; ydiff < 2; ydiff += 2) {
                        if(!Game.spawns['Spawn1'].memory.upgrades[xdiff.toString()][ydiff.toString()]) {
                            // Need an upgrade here
                            creep.room.createConstructionSite(spawnPos.x+xdiff, spawnPos.y+ydiff, STRUCTURE_EXTENSION);
                            return;
                        }
                    }
                }
                
                var position = creep.room.getPositionAt(13, 33);
                while(position.lookFor(LOOK_CREEPS) != "") {
                    if(creep.pos.isEqualTo(pos)) {
                        return;
                    }
                    position.x += 1;
                }
                creep.moveTo(position);
            }
	    }
	    else {
	        var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;