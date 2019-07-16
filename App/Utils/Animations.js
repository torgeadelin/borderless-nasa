import Animated from 'react-native-reanimated'
import { Easing } from 'react-native'
const {
    divide,
    eq,
    greaterThan,
    set,
    cond,
    startClock,
    stopClock,
    clockRunning,
    block,
    spring,
    add,
    debug,
    Value,
    Clock,
    event,
    call,
    and,
    greaterOrEq,
    lessOrEq,
    interpolate,
    timing
} = Animated;


export function runSpring(value, dest) {
    const clock = new Clock()
    const state = {
        finished: new Value(0),
        velocity: new Value(0),
        position: new Value(0),
        time: new Value(0),
    };

    const config = {
        stiffness: new Value(100),
        mass: new Value(1),
        damping: new Value(30),
        overshootClamping: false,
        restSpeedThreshold: 1,
        restDisplacementThreshold: 1,
        toValue: new Value(0),
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.velocity, 0),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        spring(clock, state, config),
        cond(state.finished, stopClock(clock)),
        set(value, state.position),
    ]);
}


export function runTiming(value, dest) {
    const clock = new Clock()
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 300,
        toValue: new Value(0),
        easing: BEZIER,
    };

    return block([

        cond(clockRunning(clock), [
            // if the clock is already running we update the toValue, in case a new dest has been passed in
            set(config.toValue, dest),
        ], [
                // if the clock isn't running we reset all the animation params and start the clock
                set(state.finished, 0),
                set(state.time, 0),
                set(state.position, value),
                set(state.frameTime, 0),
                set(config.toValue, dest),
                startClock(clock),
            ]),
        // we run the step here that is going to update position
        timing(clock, state, config),
        // if the animation is over we stop the clock
        cond(state.finished, debug('stop clock', stopClock(clock))),
        // we made the block return the updated position
        set(value, state.position)
    ]);
}

//Animation configs

export const BEZIER = Easing.bezier(.95, .09, .34, .93)

