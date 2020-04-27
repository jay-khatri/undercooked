import React from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";

var keys = { up: false, down: false, left: false, right: false };
document.body.addEventListener("keydown", function(e) {
  if (e.key === "ArrowUp") {
    keys["up"] = true;
  } else if (e.key === "ArrowDown") {
    keys["down"] = true;
  } else if (e.key === "ArrowLeft") {
    keys["left"] = true;
  } else if (e.key === "ArrowRight") {
    keys["right"] = true;
  }
});
document.body.addEventListener("keyup", function(e) {
  if (e.key === "ArrowUp") {
    keys["up"] = false;
  } else if (e.key === "ArrowDown") {
    keys["down"] = false;
  } else if (e.key === "ArrowLeft") {
    keys["left"] = false;
  } else if (e.key === "ArrowRight") {
    keys["right"] = false;
  }
});

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;
    var Body = Matter.Body;

    var engine = Engine.create({
      // positionIterations: 20
    });
    engine.world.gravity.y = 0;

    var render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: 600,
        height: 600,
        wireframes: false,
        showAngleIndicator: false
      }
    });

    var me = Bodies.polygon(230, 130, 3, 50, {
      restitution: 1.0,
      friction: 1.0,
      frictionAir: 0.5
    });
    var ballB = Bodies.circle(210, 100, 20, {
      restitution: 1.0,
      friction: 1.0,
      frictionAir: 0.5
    });
    World.add(engine.world, [
      // walls
      // Bodies.rectangle(200, 0, 600, 50, { isStatic: true }),
      // Bodies.rectangle(200, 600, 600, 50, { isStatic: true }),
      // Bodies.rectangle(260, 300, 50, 600, { isStatic: true }),
      // Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    World.add(engine.world, [me, ballB]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

    World.add(engine.world, mouseConstraint);

    Matter.Events.on(engine, "beforeTick", function(event) {
      var x = Math.cos(me.angle) / 20.0;
      var y = Math.sin(me.angle) / 20.0;
      if (keys.up) {
        me.force.x -= x;
        me.force.y -= y;
      }
      if (keys.down) {
        me.force.x += x;
        me.force.y += y;
      }
      if (keys.left) {
        Body.rotate(me, -Math.PI / 30.0);
      }
      if (keys.right) {
        Body.rotate(me, Math.PI / 30.0);
      }
      // World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
    });

    Engine.run(engine);

    Render.run(render);
  }

  render() {
    return <div ref="scene" />;
  }
}
export default Scene;
