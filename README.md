# ComputerGraphicsProject
Project for a computer graphics course

This project is meant to be a to-scale version of our solar system. (Note that while the orbital distances and velocities are all accurate relative to Earth,
the sizes of the planets are not. This is because it would be very hard to see anything on our model, the planets would be too small.)

An interesting feature to note is that we have an implementation of multiple light sources. The sun acts as as the primary light source for The Solar System 
and The Earth's moon projects a small amount of light onto Earth as well simulating the moon reflecting light from the sun onto Earth.

Controls:

Q: Decreases the speed of the simulation
W: Increases the speed of the simulation

(These controls are meant to change the scale of the distance that each planet resides from the sun. The distance of a planet is calculated by
[globalOrbitalDistance * planetsOrbitalDistanceInAstronomicalUnits]. This was done so that the outermost planets can be seen when we shrink the scale and we still
keep orbital distances to scale relative to each other planet.)
A: Shrink orbital distances
S: Expand orbital distances

Left: Move the camera farther away from The Sun
Right: Move the camera closer to The Sun

Up: Rotate the camera upwards
Down: Rotate the camera downwards

Focus Controls: (Press one of the following buttons to focus the camera on a particular body. Note: The camera remains in a static position, it just tracks the planet)
(Either the number keys or the numpad keys will suffice)
0: Sun
1: Mercury
2: Venus
3: Earth
4: Mars
5: Jupiter
6: Saturn
7: Uranus
8: Neptune