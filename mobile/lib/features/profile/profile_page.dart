import "package:flutter/material.dart";

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            CircleAvatar(radius: 30, child: Icon(Icons.person_outline)),
            SizedBox(height: 16),
            Text("Farmer Demo", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            SizedBox(height: 6),
            Text("farmer@aivillagebrain.com"),
            SizedBox(height: 20),
            ListTile(
              contentPadding: EdgeInsets.zero,
              leading: Icon(Icons.language_outlined),
              title: Text("Language"),
              subtitle: Text("English / Hindi"),
            ),
            ListTile(
              contentPadding: EdgeInsets.zero,
              leading: Icon(Icons.credit_card_outlined),
              title: Text("Subscription"),
              subtitle: Text("Village Starter - \u20B999/month"),
            ),
          ],
        ),
      ),
    );
  }
}
