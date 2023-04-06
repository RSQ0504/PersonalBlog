import { Mat4 } from './math.js';
import { Parser } from './parser.js';
import { Scene } from './scene.js';
import { Renderer } from './renderer.js';
import { TriangleMesh } from './trianglemesh.js';
// DO NOT CHANGE ANYTHING ABOVE HERE

////////////////////////////////////////////////////////////////////////////////
// TODO: Implement createCube, createSphere, computeTransformation, and shaders
////////////////////////////////////////////////////////////////////////////////

// Example two triangle quad
const quad = {
  positions: [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1,  1, -1, -1,  1, -1],
  normals: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  uvCoords: [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]
}

TriangleMesh.prototype.createCube = function() {
  // TODO: populate unit cube vertex positions, normals, and uv coordinates
  this.positions = [-1,1,1,    -1,-1,1,    1,-1,1,
                    -1,1,1,    1,1,1,      1,-1,1,//front
                    -1,1,1,    -1,1,-1,    -1,-1,1,
                    -1,-1,-1,  -1,1,-1,     -1,-1,1,//left
                    1,1,1,     1,1,-1,     1,-1,-1,
                    1,-1,-1,   1,-1,1,     1,1,1,//right
                    -1,-1,-1,  1,-1,-1,    1,1,-1, 
                    -1,-1,-1,  1,1,-1,     -1,1,-1, //back
                    -1,-1,1,   1,-1,1,     1,-1,-1,
                    -1,-1,-1,  -1,-1,1,    1,-1,-1,//bottom
                    -1,1,1,    1,1,-1,     1,1,1,
                    -1,1,1,    1,1,-1,     -1,1,-1 // top  
                    ];
  this.normals = [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,
                  -1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,
                  1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,
                  0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,
                  0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,
                  0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0];
  this.uvCoords = [0,1,      0,0.67,    0.5,0.67,
                  0,1,       0.5,1,     0.5,0.67,//front
                  1,0.67,    0.5,0.67,  1,0.33,
                  0.5,0.33,  0.5,0.67,    1,0.33,//left
                  0,0.67,    0.5,0.67,  0.5,0.33,
                  0.5,0.33,  0,0.33,    0,0.67,//right
                  0.5,0,     1,0,       1,0.33,
                  0.5,0,     1,0.33,    0.5,0.33,//back
                  0.5,0.67,  1,0.67,    1,1,
                  0.5,1,     0.5,0.67,  1,1, //buttom
                  0,0,       0.5,0.33,  0.5,0,
                  0,0,       0.5,0.33,  0,0.33//top
                ];
}

TriangleMesh.prototype.createSphere = function(numStacks, numSectors) {
  // TODO: populate unit sphere vertex positions, normals, uv coordinates, and indices
  //this.positions = quad.positions.slice(0, 9).map(p => p * 0.5);
  //this.normals = quad.normals.slice(0, 9);
  //this.uvCoords = quad.uvCoords.slice(0, 6);
  //this.indices = [0, 1, 2];
  let sectorStep = 2 * Math.PI / numSectors;
  let stackStep = Math.PI / numStacks;
  let sectorAngle, stackAngle;
  let x,y,z;
  let u,v;
  let k1,k2;
  for(let i = 0 ; i<=numStacks;i++){
    stackAngle = Math.PI / 2 - i * stackStep;
    for (let j=0;j<=numSectors;j++){
      sectorAngle = j * sectorStep; 
      x = Math.cos(stackAngle)*Math.cos(sectorAngle);
      y = Math.cos(stackAngle)*Math.sin(sectorAngle);
      z = Math.sin(stackAngle);
      this.positions.push(x);
      this.positions.push(y);
      this.positions.push(z);

      this.normals.push(x);
      this.normals.push(y);
      this.normals.push(z);

      u = (numSectors-j) / numSectors;
      v = i / numStacks;
      this.uvCoords.push(u);
      this.uvCoords.push(v);
    }
  }
  for(let i =0;i<numStacks;i++){
    k1 = i * (numSectors + 1);     // beginning of current stack
    k2 = k1 + numSectors + 1;
    for(let j=0;j<numSectors;j++,k1++,k2++){
      if(i != 0)
        {
            this.indices.push(k1);
            this.indices.push(k2);
            this.indices.push(k1 + 1);
        }

        if(i != (numStacks-1))
        {
            this.indices.push(k1 + 1);
            this.indices.push(k2);
            this.indices.push(k2 + 1);
        }

    }
  }
}

Scene.prototype.computeTransformation = function(transformSequence) {
  // TODO: go through transform sequence and compose into overallTransform
  let overallTransform = Mat4.create();  // identity matrix

  const command = transformSequence.toString();
  const arr = command.split(",");
  //console.log(command);
  //console.log(arr);
  let opt,x,y,z;
  for(let i =0;i<arr.length;i=i+4){
    opt = arr[i];
    x = arr[i+1];
    y = arr[i+2];
    z = arr[i+3];
    let m = Mat4.create();
    if(opt == "T"){
      m[3] = x;
      m[7] = y;
      m[11] = z;
      m = Mat4.transpose(m,m);
      //console.log(m) 
    }else if(opt == "S"){
      m[0]=x;
      m[5]=y;
      m[10]=z;
      m = Mat4.transpose(m,m);
    }else if(opt == "Rx"){
      let theta = Math.PI*x/180;
      m[5] = Math.cos(theta);
      m[6] = - Math.sin(theta);
      m[9] = Math.sin(theta);
      m[10] = Math.cos(theta);
      m = Mat4.transpose(m,m);
    }else if(opt == "Ry"){
      let theta = Math.PI*x/180;
      m[0] = Math.cos(theta);
      m[2] = Math.sin(theta);
      m[8] = - Math.sin(theta);
      m[10] = Math.cos(theta);
      m = Mat4.transpose(m,m);
    }else if(opt == "Rz"){
      let theta = Math.PI*x/180;
      m[0] = Math.cos(theta);
      m[1] = - Math.sin(theta);
      m[4] = Math.sin(theta);
      m[5] = Math.cos(theta);
      m = Mat4.transpose(m,m);
    }
    Mat4.multiply(overallTransform,m,overallTransform);
  }
  return overallTransform;
}

Renderer.prototype.VERTEX_SHADER = `
precision mediump float;
attribute vec3 position, normal;
attribute vec2 uvCoord;
uniform vec3 lightPosition;
uniform mat4 projectionMatrix, viewMatrix, modelMatrix;
uniform mat3 normalMatrix;
varying vec2 vTexCoord;

// TODO: implement vertex shader logic below

varying vec3 N;
varying vec3 V;
varying vec3 L;
varying vec3 H;
varying float D;

void main() {
  N = normalize(normalMatrix*normal);
  vec4 pos = viewMatrix * modelMatrix * vec4(position, 1.0);
  V = -normalize(pos.xyz);
  vec4 light = viewMatrix * vec4(lightPosition, 1.0);
  D = length(light.xyz-pos.xyz);
  L = normalize(light.xyz-pos.xyz);
  H = normalize(V+L);

  vTexCoord = uvCoord;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;

Renderer.prototype.FRAGMENT_SHADER = `
precision mediump float;
uniform vec3 ka, kd, ks, lightIntensity;
uniform float shininess;
uniform sampler2D uTexture;
uniform bool hasTexture;
varying vec2 vTexCoord;

// TODO: implement fragment shader logic below

varying vec3 N;
varying vec3 V;
varying vec3 L;
varying vec3 H;
varying float D;

void main() {
  vec3 ambient = ka * lightIntensity;

  float nl = dot(N,L); 
  float clamp_nl = max(0.0,nl);
  vec3 diffuse = kd / (D*D) * clamp_nl * lightIntensity;


  float hn = dot(N,H);
  float clamp_hn = max(0.0,hn);
  vec3 specular = ks / (D*D) * pow(clamp_hn,shininess)  * lightIntensity;
  
  vec3 color = ambient+diffuse+specular;
  gl_FragColor = vec4(texture2D(uTexture, vTexCoord))*vec4(color,1.0);
}
`;

////////////////////////////////////////////////////////////////////////////////
// EXTRA CREDIT: change DEF_INPUT to create something interesting!
////////////////////////////////////////////////////////////////////////////////

const DEF_INPUT = [
  "c,myCamera,perspective,5,5,5,0,0,0,0,1,0;",
  "l,myLight,point,0,5,0,2,2,2;",
  "p,unitCube,cube;",
  "p,unitSphere,sphere,20,20;",
  "m,redDiceMat,0.3,0,0,0.7,0,0,1,1,1,15,dice.jpg;",
  "m,grnDiceMat,0,0.3,0,0,0.7,0,1,1,1,15,dice.jpg;",
  "m,bluDiceMat,0,0,0.3,0,0,0.7,1,1,1,15,dice.jpg;",
  "m,globeMat,0.3,0.3,0.3,0.7,0.7,0.7,1,1,1,5,globe.jpg;",
  "o,rd,unitCube,redDiceMat;",
  "o,gd,unitCube,grnDiceMat;",
  "o,bd,unitCube,bluDiceMat;",
  "o,gl,unitSphere,globeMat;",
  "X,rd,Rz,75;X,rd,Rx,90;X,rd,S,0.5,0.5,0.5;X,rd,T,-1,0,2;",
  "X,gd,Ry,45;X,gd,S,0.5,0.5,0.5;X,gd,T,2,0,2;",
  "X,bd,S,0.5,0.5,0.5;X,bd,Rx,90;X,bd,T,2,0,-1;",
  "X,gl,S,1.5,1.5,1.5;X,gl,Rx,90;X,gl,Ry,-150;X,gl,T,0,1.5,0;",
].join("\n");

/*
const DEF_INPUT = [
  "c,myCamera,perspective,5,5,5,0,0,0,0,1,0;",
  "l,myLight,point,0,5,0,2,2,2;",
  "p,unitCube,cube;",
  "p,unitSphere,sphere,20,20;",
  "m,redDiceMat,0.3,0,0,0.7,0,0,1,1,1,15,dice.jpg;",
  "m,grnDiceMat,0,0.3,0,0,0.7,0,1,1,1,15,dice.jpg;",
  "m,bluDiceMat,0,0,0.3,0,0,0.7,1,1,1,15,dice.jpg;",
  "m,globeMat,0.3,0.3,0.3,0.7,0.7,0.7,1,1,1,5,globe.jpg;",
  "o,rd,unitCube,redDiceMat;",
  "o,gd,unitCube,grnDiceMat;",
  "o,bd,unitCube,bluDiceMat;",
  "o,gl,unitSphere,globeMat;",
  "o,rd1,unitCube,redDiceMat;",
  "o,gl1,unitSphere,globeMat;",
  "o,gl2,unitSphere,globeMat;",
  "o,gl3,unitSphere,globeMat;",
  "o,gl4,unitSphere,globeMat;",
  "X,rd,Rz,75;X,rd,Rx,90;X,rd,S,0.5,0.5,0.5;X,rd,T,-1,0,2;",
  "X,gd,Ry,45;X,gd,S,0.5,0.5,0.5;X,gd,T,2,0,2;",
  "X,bd,S,0.5,0.5,0.5;X,bd,Rx,90;X,bd,T,2,0,-1;",
  "X,gl,S,1,1,1;X,gl,Rx,90;X,gl,Ry,-150;X,gl,T,0,2,0;",
  "X,rd1,S,0.8,0.8,0.8;",
  "X,gl1,S,1,1,1;X,gl1,Rx,90;X,gl1,Ry,-150;X,gl1,T,0,-2,0;",
  "X,gl2,S,1.1,1.1,1.1;",
  "X,gl3,S,0.7,0.7,0.7;X,gl3,Ry,-150;X,gl3,T,1,0,3;",
  "X,gl4,S,0.7,0.7,0.7;X,gl4,Rx,90;X,gl4,T,3,-1,0;",
].join("\n");
*/
// DO NOT CHANGE ANYTHING BELOW HERE
export { Parser, Scene, Renderer, DEF_INPUT };
