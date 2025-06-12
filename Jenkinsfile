pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'playwright-tests'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:${env.PATH}"
        DOCKER_HOST = "unix:///Users/rahulm/.colima/default/docker.sock"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', 
                    branches: [[name: '*/main']], // or '*/master' depending on your default branch
                    doGenerateSubmoduleConfigurations: false, 
                    extensions: [], 
                    submoduleCfg: [], 
                    userRemoteConfigs: [[
                        credentialsId: '', // Add your credentials ID if needed
                        url: 'https://github.com/rahul201022/Playwright_CICD.git' // Replace with your actual repository URL
                    ]]
                ])
            }
        }
        
        stage('Setup Docker') {
            steps {
                script {
                    // Check if Docker is available and running
                    sh '''
                        pwd
                        ls -l                     
                        export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
                        
                        if [ -f "/opt/homebrew/bin/docker" ]; then
                            echo "Docker found at /opt/homebrew/bin/docker"
                            /opt/homebrew/bin/docker --version
                            
                            if /opt/homebrew/bin/docker info &> /dev/null; then
                                echo "Docker is running"
                                /opt/homebrew/bin/docker context ls
                            else
                                echo "Docker is not running. Please start Colima with: colima start"
                                exit 1
                            fi
                        else
                            echo "Docker not found at /opt/homebrew/bin/docker"
                            echo "Please install Docker CLI and Colima:"
                            echo "brew install docker colima"
                            echo "colima start"
                            exit 1
                        fi
                    '''
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker context use colima'
                    sh '''
                        export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
                        /opt/homebrew/bin/docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    '''
                }
            }
        }
        
        stage('Run Playwright Tests') {
            steps {
                script {
                    try {
                        sh '''
                            export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
                            /opt/homebrew/bin/docker run --rm ${DOCKER_IMAGE}:${DOCKER_TAG} npx playwright test --reporter=html
                        '''
                    } catch (Exception e) {
                        echo "Tests failed: ${e.getMessage()}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
            post {
                always {
                    script {
                        // Copy test results from container
                        sh '''
                            export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
                            /opt/homebrew/bin/docker create --name temp-container ${DOCKER_IMAGE}:${DOCKER_TAG}
                            /opt/homebrew/bin/docker cp temp-container:/app/playwright-report ./playwright-report || true
                            /opt/homebrew/bin/docker rm temp-container
                        '''
                    }
                }
            }
        }
        
        stage('Publish Test Results') {
            steps {
                script {
                    // Publish HTML report
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Test Report'
                    ])
                }
            }
        }
        
        stage('Cleanup') {
            steps {
                script {
                    sh '''
                        export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
                        /opt/homebrew/bin/docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true
                    '''
                }
            }
        }
        
        stage('Test Docker') {
            steps {
                sh 'docker context use colima'
                sh 'docker info'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        unstable {
            echo 'Pipeline completed with unstable results!'
        }
    }
} 