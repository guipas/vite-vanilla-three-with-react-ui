precision mediump float;

varying float vOpacity;

void main()
{
    gl_FragColor = vec4(0.0, 0.0, 0.0, vOpacity);
}