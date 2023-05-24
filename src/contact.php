<?php
// Vérifier si la méthode de requête est POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données du formulaire
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Valider les données
    if (!empty($name) && !empty($email) && !empty($message)) {
        // Configurer les détails de l'e-mail
        $to = 'daz.oufzor@gmail.com';
        $subject = 'Nouveau message du formulaire de contact';
        $headers = "From: $name <$email>" . "\r\n" . "Reply-To: $email" . "\r\n" . "X-Mailer: PHP/" . phpversion();
        $messageBody = "Nom: $name\n\nEmail: $email\n\nMessage: $message";

        // Envoyer l'e-mail
        if (mail($to, $subject, $messageBody, $headers)) {
            // Succès de l'envoi de l'e-mail
            echo json_encode(['success' => true]);
            exit();
        } else {
            // Erreur lors de l'envoi de l'e-mail
            echo json_encode(['success' => false, 'message' => 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail. Veuillez réessayer.']);
            exit();
        }
    } else {
        // Données manquantes
        echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs du formulaire.']);
        exit();
    }
} else {
    // Méthode de requête invalide
    echo json_encode(['success' => false, 'message' => 'Méthode de requête invalide.']);
    exit();
}
?>