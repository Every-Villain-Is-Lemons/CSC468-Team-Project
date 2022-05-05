pipeline {
    agent none
    environment {
        registry = "thescavenger126/gokoins-rng"
        docker_user = "thescavenger126"
        GOCACHE = "/tmp"
    }
    stages {
        stage('Publish') {
            agent {
                kubernetes {
                    inheritFrom 'gokoins-rng'
                }
            }
            steps{
                container('docker') {
                    sh 'echo $DOCKER_TOKEN | docker login --username $DOCKER_USER --password-stdin'
                    sh 'docker build -t $DOCKER_REGISTRY:$BUILD_NUMBER -f rng/Dockerfile .'
                    sh 'docker push $DOCKER_REGISTRY:$BUILD_NUMBER'
                }
            }
        }
        stage ('Deploy') {
            agent {
                node {
                    label 'deploy'
                }
            }
            steps {
                sshagent(credentials: ['cloudlab']) {
                    sh 'sed -i "s/DOCKER_USER/${docker_user}/g" rng.yml'
                    sh 'sed -i "s/DOCKER_APP/${docker_app}/g" rng.yml'
                    sh 'sed -i "s/BUILD_NUMBER/$BUILD_NUMBER/g" rng.yml'
                    sh 'scp -r -v -o StrictHostKeyChecking=no *.yml tylerp@clnodevm020-1.clemson.cloudlab.us:~/'
                    sh 'ssh -o StrictHostKeyChecking=no tylerp@clnodevm020-1.clemson.cloudlab.us kubectl apply -f /users/tylerp/rng.yml -n jenkins'
                    sh 'ssh -o StrictHostKeyChecking=no tylerp@clnodevm020-1.clemson.cloudlab.us kubectl apply -f /users/tylerp/rng-service.yml -n jenkins'
                }
            }
        }
    }
}
