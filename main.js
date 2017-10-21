var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var rolePicker = require('role.picker');

module.exports.loop = function () {
    
    var creepCounts = {
        'harvester': 3,
        'upgrader': 2,
        'builder': 5,
        'miner': 0,
        'picker': 1
    };
    
    for(var creep in creepCounts) {
        var creepCount = _.filter(Game.creeps, acreep => acreep.memory.role == creep).length;
        
        if(creepCount < creepCounts[creep]) {
            var newCreepCount = 1;
            var x = -3;
            while(x==-3){
                var x = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], creep+newCreepCount, {memory: {role: creep}});
                if(x == -6 || x == -4) {
                    break;
                }
                newCreepCount++;
            }
            if(x != 0 && x != -6 && x != -4) {
                console.log("Error spawning "+creep+(creepCount+1)+" as "+creep+" number "+creepCount+"+1: "+x);
            }
        }
    }
    

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'picker') {
            rolePicker.run(creep);
        }
    }
}
