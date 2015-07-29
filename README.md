#Asteroids

[Live][live]

[live]:http/itsjustdanger.github.io/asteroids

An interpretation of the classic arcade game.

##Galaga is Better
Admittedly, Asteroids was a bit before my time. By the time I played asteroids, it was already released on PC, and one could blast and fragment orbital debris as much as one wanted. Surprisingly enough, however, I HAD played Galaga in the arcade. And because of this, I have a much greater affinity for the game.

Don't get me wrong, there are certainly good things about Asteroids that one cannot deny. However, I always found that these "good things" always came paired with "bad things". The use of semi-newtonian flight is great. Instead of fixed velocity craft, we were finally given an opportunity to increase and decrease acceleration at will. Huzzah! However, the turning mechanics, while I guess somewhat "realistic", were just plain painful.

This is one feature it set out to correct. Because of this, the craft you fly in this incarnation of Asteroids faces forward. In order to make reasonable sense of this, I decided to implement a scrolling background a la Galaga. So, you're flying forward, shooting forward, and overall doing everything forward-like.

##The Background
The scrolling background was actually easier to implement than I thought. All I do is draw the background image using HTML5's Canvas with a variable y dimension. This number starts at 0 and increases by 1 with each game loop step (about 20ms). Then, another background ima0.ge is drawn right above the previous image (y - DIM_Y). So you wind up with two stacked images that scroll at the same rate. To ensure we don't have any memory leaks, we check to see if our top image has reached  a y = 0, if so, we simply reset y = 0 and continue along our merry, scrolling way.

##OOP
To save time, effort, and typing, I created a utils class that helps to manage some utility things. One of the big features is allowing it to apply inheritance across the code. This way, I establish pretty strict inheritance to help keep code DRY.

I used this primarily in objects that move. I named the parent class, somewhat abstractly, MovingObject. One method I discoverd that could not be inherited is the draw method. Because of the different styles and sizes of each image object, it didn't really make sense to have one inherited draw method. I could have easily done it by adding an offset parameter for each dimension and hardcoding different offsets for each child object, but for some reason that seems little clunky. Perhaps not any more clunky than 3 different draw methods, but this solution just seemed more natural.

##Collisions
Collision detection was relatively easy. Each object has an invisible circle as their "hit-box". If any part of the two hit-boxes intersect at any point, it's a collision. I used the following logic to accomplish this:

```var radSum = (this.rad + otherObject.rad);```

```var xDist = Math.abs(this.pos[0] - otherObject.pos[0]);```

```var yDist = Math.abs(this.pos[1] - otherObject.pos[1]);```


```var centerDist = Math.sqrt((xDist*xDist) + (yDist*yDist));```

Then, it's just a simple matter as to whether ```centerDist``` is larger than ```radSum```. Once that's in place, it's just a matter of setting the proper radii and a controller that handles collisions and post-collision actions (my movingObject class does this).
