pipeline {
    agent none 
    environment {
        registry = "linhbngo/go_server"
        docker_user = "linhbngo"
        docker_app = "go_server"
        GOCACHE = "/tmp"
    }
    stages {
        stage('Publish') {
            agent {
                kubernetes {
                    inheritFrom 'agent-template'
                }
            }
            steps{
                container('docker') {
                    sh 'echo $DOCKER_TOKEN | docker login --username $DOCKER_USER --password-stdin'
                    sh 'docker build -t $DOCKER_REGISTRY:$BUILD_NUMBER .'
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
                    sh "sed -i 's/DOCKER_USER/${docker_user}/g' deployment.yml"
                    sh "sed -i 's/DOCKER_APP/${docker_app}/g' deployment.yml"
                    sh "sed -i 's/BUILD_NUMBER/${BUILD_NUMBER}/g' deployment.yml"
                    sh 'scp -r -v -o StrictHostKeyChecking=no *.yml lngo@155.98.37.91:~/'
                    sh 'ssh -o StrictHostKeyChecking=no lngo@155.98.37.91 kubectl apply -f /users/lngo/deployment.yml -n jenkins'
                    sh 'ssh -o StrictHostKeyChecking=no lngo@155.98.37.91 kubectl apply -f /users/lngo/service.yml -n jenkins'                                        
                }
            }
        }
    }
}
