<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$config = require __DIR__ . '/config.php';

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'All fields are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please enter a valid email address.']);
    exit;
}

$html = '<h2>New Contact Form Submission</h2>'
    . '<p><strong>Name:</strong> ' . htmlspecialchars($name) . '</p>'
    . '<p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>'
    . '<p><strong>Subject:</strong> ' . htmlspecialchars($subject) . '</p>'
    . '<p><strong>Message:</strong></p>'
    . '<p>' . nl2br(htmlspecialchars($message)) . '</p>';

$payload = json_encode([
    'from'     => $config['from_name'] . ' <' . $config['from_email'] . '>',
    'to'       => [$config['contact_to']],
    'reply_to' => $email,
    'subject'  => '[Patinodyira Website] ' . $subject,
    'html'     => $html,
]);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $config['api_key'],
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 30,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Failed to connect to email service.']);
    exit;
}

$result = json_decode($response, true);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['ok' => true]);
} else {
    $errorMsg = $result['message'] ?? $result['error'] ?? 'Email delivery failed. Please try again later.';
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => $errorMsg]);
}
