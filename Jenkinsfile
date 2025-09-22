pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                // checkout the main repo
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                dir('Frontend-Jenkins') {
                    bat 'node -v'
                    bat 'npm -v'
                    bat 'npm ci'        // better for CI (uses package-lock.json)
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactemployee" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactemployee"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactemployee"
                xcopy /E /I /Y Frontend-Jenkins\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactemployee"
                '''
            }
        }

        stage('Build Backend') {
            steps {
                dir('Backend-Jenkins') {
                    bat 'mvn clean package'
                }
            }
        }

        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Backend-Jenkins.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Backend-Jenkins.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Backend-Jenkins" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Backend-Jenkins"
                )
                copy "Backend-Jenkins\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}
