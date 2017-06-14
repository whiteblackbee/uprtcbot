const MyRobot = require('../lib/index.js').Robot

const info = {'mobile':'13575774591', 'password' :'123456'}
const robot = new MyRobot()
robot.init(info)
robot.sendmessage()
