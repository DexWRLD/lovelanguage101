let scene, camera, renderer, heart;

function init() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create heart
    const heartShape = new THREE.Shape();
    
    function heartCurve(x) {
        return Math.pow(Math.sin(x), 3);
    }

    function heartCurveTop(x) {
        return 13 * Math.cos(x) - 5 * Math.cos(2*x) - 2 * Math.cos(3*x) - Math.cos(4*x);
    }

    // Create heart shape using parametric equations
    const points = [];
    for (let i = 0; i <= 50; i++) {
        const t = (i / 50) * Math.PI * 2;
        const x = 16 * heartCurve(t);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
        points.push(new THREE.Vector2(x/16, y/16));
    }

    heartShape.setFromPoints(points);

    const geometry = new THREE.ExtrudeGeometry(heartShape, {
        depth: 0.5,
        bevelEnabled: true,
        bevelSegments: 5,
        bevelSize: 0.05,
        bevelThickness: 0.05
    });

    const material = new THREE.MeshPhongMaterial({
        color: 0xff1493,
        shininess: 100,
        specular: 0xffffff,
        side: THREE.DoubleSide
    });

    heart = new THREE.Mesh(geometry, material);
    heart.scale.set(0.3, 0.3, 0.3);
    heart.rotation.z = 0;
    heart.rotation.y = Math.PI;
    scene.add(heart);

    // Add lights
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    light2.position.set(-1, -1, 1);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Start animation
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    heart.rotation.y += 0.01;
    
    // Make the heart "beat" by scaling
    const scale = 0.3 + Math.sin(Date.now() * 0.003) * 0.03;
    heart.scale.set(scale, scale, scale);

    renderer.render(scene, camera);
}

// Initialize the scene
init(); 
