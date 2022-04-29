precision mediump float;

varying float vOpacity;

void main()
{
    // gl_FragColor = vec4(0.0, 0.0, 0.0, vOpacity);
    // gl_FragColor = vec4(gl_PointCoord, 1.0, 1.0);

    float strength = distance(gl_PointCoord, vec2(0.5));
    strength *= 2.0;
    // strength = 1.0 - strength;

    // gl_FragColor = vec4(gl_PointCoord, 1.0, 1.0 - strength);
    // gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0 - strength);
    // gl_FragColor = vec4(0.2, 0.2, 1.0, (1.0 - strength));
    float opacity = (1.0 - strength) * (vOpacity);
    opacity *= step(0.1, opacity);
    gl_FragColor = vec4(0.2, 0.2, 1.0, opacity);
}