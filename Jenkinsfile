pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/ChamodiJayakody/SolveIt-frontend.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t solveit-frontend .'
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker tag solveit-frontend chamodijayakody/solveit-frontend'
                sh 'docker push chamodijayakody/solveit-frontend'
            }
        }
    }

    post {
        always {
            echo 'Frontend Pipeline completed!'
        }
        success {
            build job: 'SolveIt-Backend-Pipeline' // Trigger Backend Job
        }
    }
}