package pictest;

import java.awt.Container;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class rrr extends JFrame {

	public rrr() {
		setBak(); // �եέI����k
		Container c = getContentPane(); // ���JFrame���O
		JPanel jp = new JPanel(); // �Ыح�JPanel
		jp.setOpaque(false); // ��JPanel�]�m���z�� �o�˴N���|�B��᭱���I�� �o�˧A�N��bJPanel�H�N�[����F
		c.add(jp);
		setSize(517, 357);
		setVisible(true);
	}

	public void setBak() {
		((JPanel) this.getContentPane()).setOpaque(false);
		ImageIcon img = new ImageIcon("C://Users//duan//Desktop//david�ʶ�.jpg");
		JLabel background = new JLabel(img);
		this.getLayeredPane().add(background, new Integer(Integer.MIN_VALUE));
		background.setBounds(0, 0, img.getIconWidth(), img.getIconHeight());
	}

	public static void main(String[] args) {
		rrr s = new rrr();
		s.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}

}
