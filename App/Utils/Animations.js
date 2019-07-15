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
        damping: new Value(10),
        overshootClamping: true,
        restSpeedThreshold: 1,
        restDisplacementThreshold: 0.001,
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

//Animation configs

export const BEZIER = Easing.bezier(.95, .09, .34, .93)

