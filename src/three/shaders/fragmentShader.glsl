precision mediump float;

varying float vElevation;

void main()
{
    gl_FragColor = vec4(0.0, 0.0, 0.0, vElevation);
}