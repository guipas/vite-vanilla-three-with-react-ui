precision mediump float;
precision highp sampler3D;

uniform sampler3D uTexture;
uniform sampler2D uTexture2d;

varying float vOpacity;
varying vec3 vNormal;
varying vec3  vPosition;


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
    float opacity = (vOpacity);
    // float opacity = (1.0 - strength) * (vOpacity);
    // opacity *= step(0.1, opacity);
    // gl_FragColor = vec4(0.2, 0.2, 1.0, opacity);

    // gl_FragColor = vec4(vNormal, opacity);

    vec4 data = texture(uTexture, vec3(vPosition));
    // gl_FragColor = data;
    // gl_FragColor = vec4(vPosition.x / 3.0, vPosition.y / 3.0, vPosition.z / 3.0, 1.0);
    // gl_FragColor = vec4(vPosition.x, vPosition.y, vPosition.z, 1.0);
    // gl_FragColor = texture(uTexture2d, vec2(0.0, 0.0));
    gl_FragColor = texture(uTexture2d, vPosition.xy + 2.0);

    // float op = texture(uTexture, vec3(gl_PointCoord, 0.0)).r;
    // gl_FragColor = vec4(vNormal, op);
}