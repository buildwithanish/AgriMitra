import "package:flutter/material.dart";

class AlertsPage extends StatelessWidget {
  const AlertsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final alerts = [
      "Leaf rust watch in wheat cluster",
      "Irrigation window opens tomorrow morning",
      "Sensor anomaly detected in north block",
    ];

    return SafeArea(
      child: ListView.builder(
        padding: const EdgeInsets.all(20),
        itemCount: alerts.length,
        itemBuilder: (context, index) {
          return Card(
            elevation: 0,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
            margin: const EdgeInsets.only(bottom: 12),
            child: ListTile(
              leading: const Icon(Icons.notification_important_outlined),
              title: Text(alerts[index]),
            ),
          );
        },
      ),
    );
  }
}
